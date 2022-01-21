import React from 'react';


const MainLayout = (ViewComponent) => {
    return class extends React.Component {
        render() {
            return (
                <>
                    <ViewComponent />
                </>
            )
        }
    }
};

export default MainLayout; 
