using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using WordMaker.Context;

namespace WordMaker.Services
{
    public class WordsRepository
    {
        private readonly WordMakerContext wContext = new WordMakerContext();
        private const int MinNumberOfContainedWords = 15;

        public string GetRandomWord()
        {
            var words = wContext.Words.ToArray();
            var rnd = new Random();
            string word;

            while (GetContainedWords(word = words[rnd.Next(0, words.Count())].Value).Count() < MinNumberOfContainedWords)
            {
                
            }
            return word;
        }

        public IEnumerable<string> GetContainedWords(string word)
        {
            var words = wContext.Words;
            var containedWords = new List<string>();

            foreach (var dbWord in words)
            {
                var tempWord = word;

                if (dbWord.Value != word && dbWord.Value.Length <= word.Length)
                {
                    var wordChars = dbWord.Value.ToCharArray();
                    var containAllChars = true;

                    foreach (var wordChar in wordChars)
                    {
                        if (tempWord.IndexOf(wordChar) == -1)
                        {
                            containAllChars = false;
                            break;
                        }
                        tempWord = tempWord.Remove(tempWord.IndexOf(wordChar), 1);
                    }

                    if (containAllChars)
                    {
                        containedWords.Add(dbWord.Value);
                    }
                }
            }

            return containedWords;
        }

        public string GetExplanation(string word)
        {
            const string dictionaryApiUrl = @"https://slovari.yandex.ru/";

            var requestUrl = dictionaryApiUrl + word + "/правописание/";
            var req = System.Net.WebRequest.Create(requestUrl);
            var resp = req.GetResponse();
            var stream = resp.GetResponseStream();

            if (stream != null)
            {
                var sr = new System.IO.StreamReader(stream);
                var Out = sr.ReadToEnd();
                sr.Close();

                var regex = new Regex("(?<=\"b-serp-item__text\">).*?(?=</div>)");
                var match = regex.Match(Out);
                if (match.Success)
                {
                    return match.Value;
                }
            }

            return @"Word explanation was not found.";
        }

    }
}