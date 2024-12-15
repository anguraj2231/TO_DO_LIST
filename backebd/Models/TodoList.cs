using System.ComponentModel.DataAnnotations;
using System;

namespace backebd.Models
{
    public class TodoList
    {
        [Key]
        public Guid id { get; set; } = Guid.NewGuid();

        [Required]
        public string item { get; set; } = string.Empty;

        public bool IsChecked { get; set; } = false;
    }
}
