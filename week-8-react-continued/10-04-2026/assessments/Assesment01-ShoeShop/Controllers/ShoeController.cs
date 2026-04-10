using Microsoft.AspNetCore.Mvc;
using Assessment01_ShoeShop.Models.Entities;
using Assessment01_ShoeShop.Models.DTOs;
using Microsoft.OpenApi.MicrosoftExtensions;

namespace Assessment01_ShoeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoesController : ControllerBase
    {
        private static List<Shoe> shoes = new List<Shoe>();

        //C
        [HttpPost]
        public IActionResult Create(CreateShoeDto dto)
        {
            var shoe = new Shoe
            {
                Id = shoes.Count + 1,
                Brand = dto.Brand,
                Category = dto.Category,
                Description = dto.Description,
                Color = dto.Color,
                Sole = dto.Sole,
                Gender = dto.Gender,
                Size = dto.Size,
                Price = dto.Price
            };

            shoes.Add(shoe);

            return CreatedAtAction(nameof(GetById),
                new { id = shoe.Id },
                shoe);
        }

        //R
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(shoes);
        }


        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var shoe = shoes.FirstOrDefault(x => x.Id == id);
            if (shoe == null)
                return NotFound();

            return Ok(shoe);
        }

        // [HttpGet("{brand}")]
        // public IActionResult GetByBrand(string brand)
        // {
        //     var shoes = shoes.Where(x => x.Brand == brand);
        //     if (!shoes.Any())
        //         return NotFound();

        //     return Ok(shoes);
        // }


        [HttpGet("brand/{brand}")]
        public IActionResult GetByBrand(string brand)
        {
            var filteredShoes = shoes
                .Where(x => x.Brand.ToLower() == brand.ToLower())
                .ToList();

            if (!filteredShoes.Any())
                return NotFound(new { Message = $"No shoes found for brand '{brand}'" });

            return Ok(filteredShoes);
        }
        //U
        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateShoeDto dto)
        {
            var shoe = shoes.FirstOrDefault(x => x.Id == id);

            if (shoe == null)
                return NotFound();

            shoe.Brand = dto.Brand;
            shoe.Category = dto.Category;
            shoe.Description = dto.Description;
            shoe.Color = dto.Color;
            shoe.Sole = dto.Sole;
            shoe.Gender = dto.Gender;
            shoe.Size = dto.Size;
            shoe.Price = dto.Price;

            return CreatedAtAction(nameof(GetById),
                new { id = shoe.Id },
                shoe);
        }


        [HttpPatch("{id}")]
        public IActionResult Patch(int id, PatchShoeDto dto)
        {
            var shoe = shoes.FirstOrDefault(x => x.Id == id);
            if (shoe == null)
                return NotFound();

            if (dto.Brand != null) shoe.Brand = dto.Brand;
            if (dto.Category != null) shoe.Category = dto.Category;
            if (dto.Description != null) shoe.Description = dto.Description;
            if (dto.Color != null) shoe.Color = dto.Color;
            if (dto.Sole != null) shoe.Sole = dto.Sole;
            if (dto.Gender != null) shoe.Gender = dto.Gender;
            if (dto.Size.HasValue) shoe.Size = dto.Size.Value;
            if (dto.Price.HasValue) shoe.Price = dto.Price.Value;

            return Ok(new { Message = $"Shoe with ID {id} updated successfully." });
        }

        // D
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var shoe = shoes.FirstOrDefault(x => x.Id == id);

            if (shoe == null)
                return NotFound();

            shoes.Remove(shoe);

            return Ok(new { Message = $"Shoe with ID {id} deleted successfully." });
        }
    }
}