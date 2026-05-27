using Microsoft.EntityFrameworkCore;
using FoodOrdering.Core.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Area("Admin")]
[Authorize(Roles = "Admin")]
public class FoodController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _env;

    public FoodController(ApplicationDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    public async Task<IActionResult> Index()
    {
        var items = await _context.FoodItems
            .Include(f => f.Category).ToListAsync();
        return View(items);
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        ViewBag.Categories = await _context.Categories.ToListAsync();
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Create(FoodItem model, IFormFile? imageFile)
    {
        if (imageFile != null)
        {
            var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var path = Path.Combine(_env.WebRootPath, "images", "food", fileName);
            using var stream = new FileStream(path, FileMode.Create);
            await imageFile.CopyToAsync(stream);
            model.ImageUrl = "/images/food/" + fileName;
        }
        _context.FoodItems.Add(model);
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.FoodItems.FindAsync(id);
        if (item != null) { _context.FoodItems.Remove(item); await _context.SaveChangesAsync(); }
        return RedirectToAction(nameof(Index));
    }
}