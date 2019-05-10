import React from 'react';
import SideBar from './SideBar'
import NavBar from './NavBar'
import RMPBody from './RMPBody'

export default (metaDashboard) => {

    return (
        <div style={{
            maxWidth: "100%",
            display: "flex",
            paddingTop: "69px",
            WebkitBoxAlign: "center",
            alignItems: "center",
            flexDirection: "column",
        }}>
            <div style={{
                maxWidth: "1034px",
                display: "flex",
                alignItems: "flex-start",
                paddingTop: "41px",
                margin: "0px auto",
            }}>
                <NavBar metaDashboard={metaDashboard}/>
                <SideBar/>
                <RMPBody metaDashboard={metaDashboard}/>
            </div>
        </div>
    )

}