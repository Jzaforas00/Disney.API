using DineyApi.Clients;
using DineyApi.Models;

namespace DineyApi.GraphQL
{
    public class CharacterQuery
    {
        private readonly DisneyApiClient _client;

        public CharacterQuery(DisneyApiClient client)
        {
            _client = client;
        }

        public async Task<List<Character>> GetCharacters(int page, string? name)
        {
            var result = await _client.GetCharactersAsync(page, name);

            return result?.data?
                       .Where(x => x != null)
                       .Select(x => new Character
                       {
                           _id = x._id,
                           name = x.name ?? "",
                           imageUrl = x.imageUrl ?? "",
                           films = x.films ?? new List<string>(),
                           shortFilms = x.shortFilms ?? new List<string>(),
                           tvShows = x.tvShows ?? new List<string>(),
                           videoGames = x.videoGames ?? new List<string>(),
                           allies = x.allies ?? new List<string>(),
                           enemies = x.enemies ?? new List<string>()
                       })
                       .ToList()
                   ?? new List<Character>();
        }
    }
}