import React from 'react';

export const Footer = () => {
    return (
        <footer className="page-footer">
            <div className="container">
                © Copyright {new Date().getFullYear()} X Team
            </div>
        </footer>
    );
}