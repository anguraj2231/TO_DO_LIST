using backebd.Data;
using backebd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backebd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ListController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext; 
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var items = await _dbContext.todoLists.ToListAsync();
            return Ok(items);
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TodoList list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _dbContext.todoLists.AddAsync(list);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = list.id }, list);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] TodoList list)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var item = await _dbContext.todoLists.FirstOrDefaultAsync(x => x.id == id);
            if (item == null)
            {
                return NotFound();
            }
            item.IsChecked = list.IsChecked;
            item.item = list.item;  
            await _dbContext.SaveChangesAsync();
            return Ok(item);
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var list = await _dbContext.todoLists.FirstOrDefaultAsync(x => x.id == id);
            if (list == null)
            {
                return NotFound();
            }
            _dbContext.Remove(list);
            await _dbContext.SaveChangesAsync();
            return Ok("Deleted Successfully..!!");
        }
    }
}
