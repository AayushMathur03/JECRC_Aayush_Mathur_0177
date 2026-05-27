using FoodOrdering.Core.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[Authorize]
public class CartController : Controller
{
    private readonly ApplicationDbContext _context;

    public CartController(ApplicationDbContext context) => _context = context;

    private List<CartItem> GetCart()
    {
        var json = HttpContext.Session.GetString("Cart");
        return json == null ? new List<CartItem>()
            : System.Text.Json.JsonSerializer.Deserialize<List<CartItem>>(json)!;
    }

    private void SaveCart(List<CartItem> cart)
    {
        HttpContext.Session.SetString("Cart",
            System.Text.Json.JsonSerializer.Serialize(cart));
    }

    public IActionResult Index()
    {
        return View(GetCart());
    }

    public async Task<IActionResult> AddToCart(int id)
    {
        var food = await _context.FoodItems.FindAsync(id);
        if (food == null) return NotFound();

        var cart = GetCart();
        var existing = cart.FirstOrDefault(c => c.FoodItemId == id);
        if (existing != null) existing.Quantity++;
        else cart.Add(new CartItem
        {
            FoodItemId = food.Id,
            FoodItemName = food.Name,
            UnitPrice = food.Price,
            Quantity = 1,
            ImageUrl = food.ImageUrl
        });
        SaveCart(cart);
        TempData["Success"] = $"{food.Name} added to cart!";
        return RedirectToAction("Index", "Menu");
    }

    public IActionResult RemoveFromCart(int id)
    {
        var cart = GetCart();
        cart.RemoveAll(c => c.FoodItemId == id);
        SaveCart(cart);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    public async Task<IActionResult> Checkout(string deliveryAddress, string? notes)
    {
        var cart = GetCart();
        if (!cart.Any()) return RedirectToAction(nameof(Index));

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        var order = new Order
        {
            UserId = userId,
            DeliveryAddress = deliveryAddress,
            Notes = notes,
            TotalAmount = cart.Sum(c => c.TotalPrice),
            OrderItems = cart.Select(c => new OrderItem
            {
                FoodItemId = c.FoodItemId,
                Quantity = c.Quantity,
                UnitPrice = c.UnitPrice
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        SaveCart(new List<CartItem>());
        return RedirectToAction("OrderConfirmation", "Order", new { id = order.Id });
    }
}