using System.Linq;
using WordMaker.Context;
using WordMaker.Models;

namespace WordMaker.Services
{
    public class PlayersRepository
    {
        private readonly WordMakerContext wContext = new WordMakerContext();

        public void UpdatePlayer(Player player)
        {
            var firstPlayer = wContext.Users.FirstOrDefault(p => p.Id == player.Id);

            if (firstPlayer != null)
            {
                firstPlayer.TotalScore = 1;
            }
            wContext.SaveChanges();
        }
    }
}