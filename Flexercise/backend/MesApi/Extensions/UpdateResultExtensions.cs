using Microsoft.AspNetCore.Mvc;
using MesApi.Logic;

namespace MesApi.Extensions
{
    public static class UpdateResultExtensions
    {
        public static IActionResult ToActionResult(this UpdateResult result, ControllerBase controller)
        {
            return result switch
            {
                UpdateResult.BadRequest => controller.BadRequest(),
                UpdateResult.NotFound => controller.NotFound(),
                UpdateResult.NoChanges or UpdateResult.Updated => controller.NoContent(),
                _ => controller.StatusCode(500)
            };
        }
    }
}