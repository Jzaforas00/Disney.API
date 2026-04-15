using DineyApi.Models;

namespace DineyApi.Clients
{
    public class DisneyApiClient
    {
        private readonly HttpClient _http;

        public DisneyApiClient(HttpClient http)
        {
            _http = http;
        }

        public async Task<DisneyCharacterResponse?> GetCharactersAsync(int page, string? name)
        {
            var url = $"character?page={page}";

            if (!string.IsNullOrWhiteSpace(name))
                url += $"&name={name}";

            return await _http.GetFromJsonAsync<DisneyCharacterResponse>(url);
        }

        public async Task<Character?> GetCharacterByIdAsync(int id)
        {
            int page = 1;

            while (true)
            {
                var response = await _http.GetFromJsonAsync<DisneyCharacterResponse>(
                    $"character?page={page}"
                );

                var character = response?.data?.FirstOrDefault(x => x._id == id);

                if (character != null)
                    return character;

                if (response?.info?.nextPage == null)
                    break;

                page++;
            }

            return null;
        }
    }
}
