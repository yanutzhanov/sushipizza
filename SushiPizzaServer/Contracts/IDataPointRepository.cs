using Entites.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IDataPointRepository
    {
        IEnumerable<DataPoint> GetDataPoints();
    }
}
