import { Outlet } from 'react-router-dom';

const BasicLayout = (): JSX.Element => {
    return <div>
        basic layout
        <Outlet />    
    </div>
};

export default BasicLayout;