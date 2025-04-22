using System.ComponentModel.DataAnnotations;

namespace FinalProject.API.Data;

public class EntertainerSummaryDto
{
    [Required]
    public int EntertainerID { get; set; }
    public string? EntStageName { get; set; }
    public int? BookingCount { get; set; }
    public string? LastBookingDate { get; set; }
}