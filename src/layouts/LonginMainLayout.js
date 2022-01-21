import React from 'react'

const LonginMainLayout = (ViewComponent) => {
    return class extends React.Component {
        render() {
            return (
                <>
                    <div className="login-items-container">
                        <ViewComponent />
                    </div>

                </>
            )
        }
    }
};

export default LonginMainLayout; 
