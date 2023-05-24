// import { useSelector } from 'react-redux';
import DatatableTables from 'components/Table/Table';
import { PlatformVariablesHistoryColumn } from 'constants/tableColumn';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'reactstrap';
import { getPlatformActivityHistory } from 'store/actions';

const ActivityHistory = ({ isOpen, close, id }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  // const [isLoading, setIsLoading] = useState(false);
  const [paginationConfig, setPaginationConfig] = useState({});
  const { isPlatLoading, activityHistory } = useSelector(state => state.platformVariable);

  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(getPlatformActivityHistory(`${id}?page=${page}&limit=${count}`));

    // dispatch(platVariableList(`?page=${page}&limit=${count}`));
  };
  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    // setIsLoading(true);
    if (activityHistory?.list) {
      activityHistory?.list?.forEach(ele => {
        const obj = ele;
        obj.createdAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        obj.tenure = ele?.previousValue?.tenure || '-';
        obj.value = ele?.previousValue?.rate || '-';
        // obj.userRole = ele.userRole || '-';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: activityHistory?.totalPage,
        count,
        itemCount: activityHistory?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
      // setIsLoading(false);
    }
  }, [activityHistory]);
  // eslint-disable-next-line no-unused-vars
  function togCreate() {
    close(false);
  }
  // console.log("PlatformVariablesHistoryColumn",activityHistory);
  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen} style={{ maxWidth: 'fit-content' }}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                Activity History
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DatatableTables
                column={PlatformVariablesHistoryColumn}
                row={isPlatLoading ? 'loading' : activityHistory?.list}
                paginationConfig={paginationConfig}
                hidePaging
                // action={action}
              />
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ActivityHistory;
