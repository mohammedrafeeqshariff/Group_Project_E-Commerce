import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineFavoriteBorder } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { AiFillStar, AiOutlineHome } from "react-icons/ai";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const sections = [
        {
            title: "Main",
            links: [
                { to: "/", icon: <AiOutlineHome size={25} />, label: "Home" },
                {
                    to: "/admin",
                    icon: <MdOutlineDashboard size={25} />,
                    label: "Dashboard",
                },
            ],
        },
        {
            title: "List",
            links: [
                {
                    to: "/admin/products",
                    icon: <HiTemplate size={25} />,
                    label: "Products",
                },
                {
                    to: "/admin/orders",
                    icon: <MdOutlineFavoriteBorder size={25} />,
                    label: "Orders",
                },
                {
                    to: "/admin/users",
                    icon: <BiUserCircle size={25} />,
                    label: "Users",
                },
                {
                    to: "/admin/reviews",
                    icon: <AiFillStar size={25} />,
                    label: "Reviews",
                },
            ],
        },
        {
            title: "Service",
            links: [
                {
                    to: "/admin/products/new",
                    icon: <FiPlusSquare size={25} />,
                    label: "Add Product",
                },
            ],
        },
    ];

    return (
        <nav className={styles.sidebar} aria-label="Sidebar">
            <img
                src="https://res.cloudinary.com/mehedi08h/image/upload/v1648446111/shopx/logo2_diozsh.png"
                alt="ShopX Logo"
                style={{ height: "40px" }}
            />
            {sections.map((section, index) => (
                <div key={index}>
                    <span>{section.title}</span>
                    <ul className="mt-1">
                        {section.links.map((link, idx) => (
                            <li key={idx}>
                                <Link to={link.to} className={styles.link}>
                                    <span className="me-3">{link.icon}</span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
};

export default Sidebar;
