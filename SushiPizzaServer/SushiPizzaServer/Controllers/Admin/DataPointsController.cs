using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SushiPizzaServer.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataPointsController : ControllerBase
    {
        private IDataPointRepository _dataPointRepository;
        public DataPointsController(IDataPointRepository dataPointRepository)
        {
            _dataPointRepository = dataPointRepository;
        }

        [HttpGet]
        public IActionResult GetDataPoints()
        {
            return Ok(_dataPointRepository.GetDataPoints());
        }
    }
}