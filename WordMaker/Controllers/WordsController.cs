using System.Collections.Generic;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using WordMaker.Models;
using WordMaker.Services;

namespace WordMaker.Controllers
{
    [Authorize]
    public class WordsController : ApiController
    {
        private readonly WordsRepository _wordsRepo;
        private readonly PlayersRepository _playersRepo;

        public WordsController()
        {
            _wordsRepo = new WordsRepository();
            _playersRepo = new PlayersRepository();
        }

        //API: Get Random Word From Database      
        [HttpGet]
        [ActionName("GetRandomWord")]
        public string GetRandomWord()
        {
            _playersRepo.UpdatePlayer(new Player() { Id = User.Identity.GetUserId() });
            return _wordsRepo.GetRandomWord();
        }

        //API: Get Contained Words For Chosen One
        [HttpGet]
        [ActionName("GetContainedWords")]
        public IEnumerable<string> GetContainedWords(string word)
        {
            return _wordsRepo.GetContainedWords(word);
        }

        //API: Get Word Explanation From Yandex Dictionaries
        [HttpGet]
        [ActionName("GetExplanation")]
        public string GetExplanation(string word)
        {
            return _wordsRepo.GetExplanation(word);
        }
    }
}
