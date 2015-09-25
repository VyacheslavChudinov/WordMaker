using System.Web.Http.Results;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WordMaker.Models
{
    public class Player : IdentityUser
    {
        public int TotalScore { get; set; }

        public int TotalGames { get; set; }

        public int Score { get; set; }
    }
}