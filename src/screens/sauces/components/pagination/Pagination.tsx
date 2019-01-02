import * as React from "react";
import { Link } from "../../../../components/Link/Link";
import { Button } from "../../../../components/Button/Button";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > a,
  > span {
    margin: 0 0.5em;
  }
`;

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
    <StyledDiv>
      {/* First Button */}
      {page !== 1 && (
        <Link to={`/sauces/?page=${1}&limit=${limit}`}>
          <Button displayType="outline">First</Button>
        </Link>
      )}

      {/* Previous Button */}
      {page !== 1 && (
        <Link to={`/sauces/?page=${page - 1}&limit=${limit}`}>
          <Button displayType="outline">Prev</Button>
        </Link>
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
      <span>{page}</span>

      {/* Show future few button */}
      {new Array(upperBound - page).fill(undefined).map((x, ind) => {
        return (
          <Link to={`/sauces/?page=${page + ind + 1}&limit=${limit}`}>
            {(page + ind + 1).toString()}
          </Link>
        );
      })}

      {/* Next Button */}
      {page !== totalPages && (
        <Link to={`/sauces/?page=${page + 1}&limit=${limit}`}>
          <Button displayType="outline">Next</Button>
        </Link>
      )}

      {/* Last Button */}
      {page !== totalPages && (
        <Link to={`/sauces/?page=${totalPages}&limit=${limit}`}>
          <Button displayType="outline">Last</Button>
        </Link>
      )}
    </StyledDiv>
  );
};

export default Pagination;
