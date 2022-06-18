import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Skeleton } from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import CustomAlert from "../../Components/CustomAlert";
import CustomTable from "../../ReactTable/CustomTable";
import { userColumn } from "../../ReactTable/TableColumns/UserColumn";
import { getUseryList, userListReset } from "../../Redux/actions/userActions";
import DashboardLayout from "../DashboardLayout/DashboardLayout";

const DashboardUsers = () => {
  // Redux element
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { user } = useSelector((state) => state.deleteUser);
  const { user: updatedUser } = useSelector((state) => state.updateUser);

  useEffect(() => {
    dispatch(getUseryList("users"));

    return () => {
      dispatch(userListReset());
    };
  }, [dispatch, user?.success, updatedUser?.email]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(userListReset());
      // navigate("/");
    }
    if (users?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(userListReset());
      // navigate("/");
    }
  }, [error, users, dispatch]);

  // React table elements
  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => userColumn, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns: ["avatar", "_id"] },
    },
    useGlobalFilter,
    usePagination
  );

  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;
  return (
    <DashboardLayout
      title="Users"
      filter={globalFilter}
      setFilter={setGlobalFilter}
    >
      <section className="user__section">
        <div className="user__container">
          <div className="user__header">
            {loading ? (
              <Skeleton width={100} animation="wave" height={35} />
            ) : (
              <h4 className="header__title">User list</h4>
            )}

            {false &&
              (<Skeleton variant="rectangular" width={130} height={35} />)(
                <div className="btn small__btn btn__dark">
                  <Button type="button">
                    <span className="btn__text">Delete</span>
                    <DeleteIcon />
                  </Button>
                </div>
              )}
          </div>

          {!loading && users?.length === 0 ? (
            <CustomAlert severity="info" message="No users found!" />
          ) : (
            <div className="user__users">
              <CustomTable tableInstance={tableInstance} loading={loading} />
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardUsers;
