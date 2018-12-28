import * as React from "react";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  range: number;
}

const Pagination: React.SFC<PaginationProps> = props => {
  const { total, page, limit, range } = props;
  const totalPages = Math.ceil(total / limit);
  const lowerBound = page - range > 1 ? page - range : 1; // Get the lower bound. We don't want negative value so stop at 0
  const upperBound = page + range < totalPages ? page + range : totalPages; // Get the upper bound. We don't want value too high so stop at max # of pages
  return (
    <div>
      {/* Go Back */}
      {page !== 1 ? (
        <div>
          <Link to={`/sauces/?page=${1}&limit=${limit}`}>
            <Button displayType="outline">First</Button>
          </Link>
          <Link to={`/sauces/?page=${page - 1}&limit=${limit}`}>
            <Button displayType="outline">Prev</Button>
          </Link>
        </div>
      ) : (
        ""
      )}

      {/* Show past few pages */}
      {new Array(page - lowerBound).fill(undefined).map((x, ind) => {
        return (
          <Link to={`/sauces/?page=${lowerBound + ind}&limit=${limit}`}>
            {(lowerBound + ind).toString()}
          </Link>
        );
      })}

      {/* Center */}
      <div>{page}</div>

      {/* Show future few button */}
      {new Array(upperBound - page).fill(undefined).map((x, ind) => {
        return (
          <Link to={`/sauces/?page=${page + ind}&limit=${limit}`}>
            {(page + ind).toString()}
          </Link>
        );
      })}

      {/* Go Forward */}
      {page !== totalPages ? (
        <div>
          <Link to={`/sauces/?page=${page + 1}&limit=${limit}`}>
            <Button displayType="outline">Next</Button>
          </Link>
          <Link to={`/sauces/?page=${totalPages}&limit=${limit}`}>
            <Button displayType="outline">Last</Button>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
