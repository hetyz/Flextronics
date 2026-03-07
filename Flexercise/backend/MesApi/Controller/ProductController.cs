using MesApi.Dto;
using MesApi.Entity;
using MesApi.Extensions;
using MesApi.Logic;
using Microsoft.AspNetCore.Mvc;

namespace MesApi.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController(IProductService service) : ControllerBase
    {
        private readonly IProductService _service = service;

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var p = await _service.GetByIdAsync(id);
            return p is null ? NotFound() : Ok(p);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create(CreateProductDto dto)
        {
            var product = await _service.CreateAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = product.Id },
                product
            );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateProductDto dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return result.ToActionResult(this);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
            => await _service.DeleteAsync(id) ? NoContent() : NotFound();
    }

}