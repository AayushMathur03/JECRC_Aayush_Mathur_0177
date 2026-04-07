using BillGeneratorAPI.DTOs;
using BillGeneratorAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillGeneratorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogService _catalogService;
        private readonly ILogger<CatalogController> _logger;

        public CatalogController(ICatalogService catalogService, ILogger<CatalogController> logger)
        {
            _catalogService = catalogService;
            _logger = logger;
        }

        // ========================================
        // GET: api/Catalog
        // Get all catalog items
        // ========================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CatalogItemDto>>> GetAllCatalogItems()
        {
            try
            {
                var items = await _catalogService.GetAllCatalogItemsAsync();
                return Ok(new
                {
                    success = true,
                    count = items.Count(),
                    data = items
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all catalog items");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving catalog items"
                });
            }
        }

        // ========================================
        // GET: api/Catalog/type/EntranceFee
        // Get catalog items by type
        // ========================================
        [HttpGet("type/{catalogType}")]
        public async Task<ActionResult<IEnumerable<CatalogItemDto>>> GetCatalogItemsByType(string catalogType)
        {
            try
            {
                var items = await _catalogService.GetCatalogItemsByTypeAsync(catalogType);
                return Ok(new
                {
                    success = true,
                    catalogType = catalogType,
                    count = items.Count(),
                    data = items
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving catalog items by type: {CatalogType}", catalogType);
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving catalog items"
                });
            }
        }

        // ========================================
        // GET: api/Catalog/5
        // Get catalog item by ID
        // ========================================
        [HttpGet("{id}")]
        public async Task<ActionResult<CatalogItemDto>> GetCatalogItemById(int id)
        {
            try
            {
                var item = await _catalogService.GetCatalogItemByIdAsync(id);
                if (item == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = $"Catalog item with ID {id} not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    data = item
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving catalog item by ID: {Id}", id);
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while retrieving the catalog item"
                });
            }
        }

        // ========================================
        // POST: api/Catalog
        // Create new catalog item
        // ========================================
        [HttpPost]
        public async Task<ActionResult<CatalogItemDto>> CreateCatalogItem([FromBody] CreateCatalogItemDto createDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Validation failed",
                        errors = ModelState
                    });
                }

                var createdItem = await _catalogService.CreateCatalogItemAsync(createDto);

                return CreatedAtAction(
                    nameof(GetCatalogItemById),
                    new { id = createdItem.Id },
                    new
                    {
                        success = true,
                        message = "Catalog item created successfully",
                        data = createdItem
                    });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating catalog item");
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while creating the catalog item"
                });
            }
        }

        // ========================================
        // PUT: api/Catalog/5
        // Update catalog item
        // ========================================
        [HttpPut("{id}")]
        public async Task<ActionResult<CatalogItemDto>> UpdateCatalogItem(int id, [FromBody] UpdateCatalogItemDto updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Validation failed",
                        errors = ModelState
                    });
                }

                var updatedItem = await _catalogService.UpdateCatalogItemAsync(id, updateDto);
                if (updatedItem == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = $"Catalog item with ID {id} not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Catalog item updated successfully",
                    data = updatedItem
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating catalog item: {Id}", id);
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while updating the catalog item"
                });
            }
        }

        // ========================================
        // DELETE: api/Catalog/5
        // Delete catalog item
        // ========================================
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCatalogItem(int id)
        {
            try
            {
                var result = await _catalogService.DeleteCatalogItemAsync(id);
                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = $"Catalog item with ID {id} not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Catalog item deleted successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting catalog item: {Id}", id);
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while deleting the catalog item"
                });
            }
        }

        // ========================================
        // PATCH: api/Catalog/5/toggle-active
        // Toggle active status
        // ========================================
        [HttpPatch("{id}/toggle-active")]
        public async Task<ActionResult> ToggleActiveStatus(int id)
        {
            try
            {
                var result = await _catalogService.ToggleActiveStatusAsync(id);
                if (!result)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = $"Catalog item with ID {id} not found"
                    });
                }

                return Ok(new
                {
                    success = true,
                    message = "Active status toggled successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling active status for catalog item: {Id}", id);
                return StatusCode(500, new
                {
                    success = false,
                    message = "An error occurred while toggling active status"
                });
            }
        }
    }
}