using System.ComponentModel.DataAnnotations;

namespace FinalProject.API.Data;

public class Engagement
{
    [Key]
    [Required]
    public int EngagementNumber { get; set; }
    public int? EntertainerID { get; set; }
    public string? StartDate { get; set; }
    public string? EndDate { get; set; }

    public Entertainer Entertainer { get; set; }
}