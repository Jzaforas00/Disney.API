namespace DineyApi.Models
{
    public class DisneyCharacterResponse
    {
        public Info info { get; set; }
        public List<Character> data { get; set; }
    }

    public class Info
    {
        public int count { get; set; }
        public int totalPages { get; set; }
        public string? nextPage { get; set; }
        public string? previousPage { get; set; }
    }
}
