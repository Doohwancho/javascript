import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({icon, title}) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
        </nav>
    )
}

Navbar.defaultProps = { //<Navbar title="Github Finder" icon="fab fa-github"/> 대신 쓰는 것
    title: 'Github Finder',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar
