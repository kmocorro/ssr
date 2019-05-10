import React from 'react'
import { Link } from 'react-router-dom'
 
export default (metaDashboard) => {

    const metaDashboard_props = metaDashboard.metaDashboard.meta.data;

    const token_claim = {
        employeeNumber: metaDashboard_props.claim.employeeNumber,
        nickName: metaDashboard_props.claim.nickName,
        displayName: metaDashboard_props.claim.displayName,
        title: metaDashboard_props.claim.title,
        department: metaDashboard_props.claim.department,
        username: metaDashboard_props.claim.username,
    }
    
    return (
        <div style={{
            height: "69px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            position: "fixed",
            width: "100%",
            top: "0px",
            left: "0px",
            zIndex: "15",
            borderBottom: "1px solid rgb(238, 238, 238)",
        }}> 
            <div style={{
                display: "flex",
                WebkitBoxAlign: "center",
                alignItems: "center",
                height: "100%",
                maxWidth: "1034px",
                margin: "0px auto",
            }}
            >
                <Link to="/"
                    style={{
                        display: "inline-block",
                        paddingTop: ".3125rem",
                        paddingBottom: ".3125rem",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                        fontSize: "1.25rem",
                        lineHeight: "inherit",
                        whiteSpace: "nowrap",
                        color: "black",
                        textDecoration: "none",
                    }}
                >meta/fab4</Link>
                <div style={{
                    display: "flex",
                    listStyle: "none",
                    flexGrow: 1,
                }}>
                    <ul style={{
                            marginLeft: "auto",
                            listStyle: "none",
                            marginBottom: "0px",
                            marginTop: "0px",
                        }}
                    >
                        <li style={{
                                listStyle: "none",
                            }}
                        >
                            <p style={{
                                display: "inline-block",
                                paddingTop: ".3125rem",
                                paddingBottom: ".3125rem",
                                margin: "auto 1rem",
                                fontSize: "1rem",
                                lineHeight: "inherit",
                                whiteSpace: "nowrap",
                                color: "black",
                                textDecoration: "none",
                                transition: ".35s"
                            }}>
                            {token_claim.nickName}
                            </p>
                        </li>
                    </ul>
                </div>
            
            </div>
            

        </div>
    )
}