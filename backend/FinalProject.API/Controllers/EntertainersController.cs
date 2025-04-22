using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using FinalProject.API.Data;

namespace FinalProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainerContext _context;

        public EntertainersController(EntertainerContext temp)
        {
            _context = temp;
        }

        [HttpGet("Summary")]
        public async Task<IActionResult> GetEntertainerSummaries()
        {
            var summaries = await _context.Entertainers
                .Select(e => new EntertainerSummaryDto
                {
                    EntertainerID = e.EntertainerID,
                    EntStageName = e.EntStageName,
                    BookingCount = _context.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                    LastBookingDate = _context.Engagements
                        .Where(en => en.EntertainerID == e.EntertainerID)
                        .OrderByDescending(en => en.EndDate)
                        .Select(en => en.EndDate) // no need for DateTime? cast
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(summaries);
        }

        // GET: /Entertainers/GetAll
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var allEntertainers = await _context.Entertainers.ToListAsync();
            return Ok(allEntertainers);
        }

        // GET: /Entertainers/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            return Ok(entertainer);
        }

        // POST: /Entertainers/Add
        [HttpPost("Add")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEnt)
        {
            _context.Entertainers.Add(newEnt);
            _context.SaveChanges();
            return Ok(newEnt);
        }

        // PUT: /Entertainers/Update/{id}
        [HttpPut("Update/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updatedEnt)
        {
            var existingEnt = _context.Entertainers.Find(id);
            if (existingEnt == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            existingEnt.EntStageName = updatedEnt.EntStageName;
            existingEnt.EntSSN = updatedEnt.EntSSN;
            existingEnt.EntStreetAddress = updatedEnt.EntStreetAddress;
            existingEnt.EntCity = updatedEnt.EntCity;
            existingEnt.EntState = updatedEnt.EntState;
            existingEnt.EntZipCode = updatedEnt.EntZipCode;
            existingEnt.EntPhoneNumber = updatedEnt.EntPhoneNumber;
            existingEnt.EntWebPage = updatedEnt.EntWebPage;
            existingEnt.EntEMailAddress = updatedEnt.EntEMailAddress;
            existingEnt.DateEntered = updatedEnt.DateEntered;

            _context.Entertainers.Update(existingEnt);
            _context.SaveChanges();

            return Ok(existingEnt);
        }

        // DELETE: /Entertainers/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _context.Entertainers.Find(id);
            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _context.Entertainers.Remove(entertainer);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
