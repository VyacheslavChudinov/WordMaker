using System.ComponentModel.DataAnnotations;

namespace WordMaker.Models
{
    public class Word
    {
        [Key]        
        public int Id { get; set; }

        [Required]
        [MaxLength(64)] 
        public string Value { get; set; }
    }
}