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

        public async Task<DisneyCharacterResponse?> GetCharactersAsync(
            int page,
            int pageSize,
            string? name)
        {
            var url = $"character?page={page}&pageSize={pageSize}";

            if (!string.IsNullOrWhiteSpace(name))
                url += $"&name={name}";

            return await _http.GetFromJsonAsync<DisneyCharacterResponse>(url);
        }

        public async Task<Character?> GetCharacterByIdAsync(int id)
        {
            var response = await _http.GetFromJsonAsync<DisneyCharacterSingleResponse>(
                $"character/{id}"
            );

            return response?.data;
        }

    }
}
