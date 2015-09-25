using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using WordMaker.Models;

namespace WordMaker.Context
{
    public class WordMakerContext : IdentityDbContext<Player>
    {
        public WordMakerContext() : base("DBConnection")
        {
            
        }

        public static WordMakerContext Create()
        {
            return new WordMakerContext();
        }

        public DbSet<Word> Words { get; set; }
    }
}