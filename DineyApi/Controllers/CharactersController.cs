using DineyApi.Clients;
using Microsoft.AspNetCore.Mvc;

namespace DineyApi.Controllers
{
    [ApiController]
    [Route("api/characters")]
    public class CharactersController : ControllerBase
    {
        private readonly DisneyApiClient _client;

        public CharactersController(DisneyApiClient client)
        {
            _client = client;
        }

        // LISTADO + BUSQUEDA + PAGINACION
        [HttpGet]
        public async Task<IActionResult> GetCharacters(
            int page = 1,
            int pageSize = 50,
            string? name = null)
        {
            var result = await _client.GetCharactersAsync(page, pageSize, name);
            return Ok(result);
        }

        // DETALLE
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _client.GetCharacterByIdAsync(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
