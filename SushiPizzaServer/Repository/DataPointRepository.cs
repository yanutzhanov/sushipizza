using Contracts;
using Entites;
using Entites.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Repository
{
    public class DataPointRepository : IDataPointRepository
    {
        private readonly RepositoryContext _context;
        public DataPointRepository(RepositoryContext context)
        {
            this._context = context;
        }

        public IEnumerable<DataPoint> GetDataPoints()
        {
            List<DataPoint> dataPoints = new List<DataPoint>();

            var orderGroups = _context.Orders.Where(x => x.OrderTime > DateTime.Now - TimeSpan.FromDays(30))
                              .GroupBy(x => x.OrderTime.Day);


            foreach (IGrouping<DateTime, Order> orderGroup in orderGroups)
            {
                dataPoints.Add(new DataPoint { Date = orderGroup.Key, Sum = orderGroup.Select(x => x.TotalPrice).Sum() });
            }

            return dataPoints;
        }
    }
}
