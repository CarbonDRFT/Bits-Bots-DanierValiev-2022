import { Link } from 'react-router-dom';

import './Pagination.style.scss';

type Props = {
  pages: {
    number: number;
    link: string;
  }[];
  currentPage?: number;
};

const Pagination = ({ pages, currentPage }: Props): JSX.Element => 
  (
    <div className="pagination">
      {pages.map(
        (page, index) =>
        <div key={index} className={`pagination__number ${index + 1 === currentPage ? 'pagination__number--active' : ''}`}>
          <Link to={page.number !== 1 ? page.link : '/'}>{page.number}</Link>
        </div>
      )}
    </div>
  );

export default Pagination;
