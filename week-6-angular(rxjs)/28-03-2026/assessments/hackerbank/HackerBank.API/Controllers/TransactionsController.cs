using HackerBank.API.Data;
using HackerBank.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HackerBank.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransactionsController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/transactions
    // GET /api/transactions?date=2019-11-29
    [HttpGet]
public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions([FromQuery] string? date)
{
    var query = _context.Transactions.AsQueryable();

    if (!string.IsNullOrWhiteSpace(date))
    {
        query = query.Where(t => t.Date == date);
    }

    return Ok(await query.ToListAsync());
}
}