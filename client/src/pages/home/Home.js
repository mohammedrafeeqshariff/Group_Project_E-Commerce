import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/MetaData";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import Fashion from "./fashion/Fashion";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    // filter products by types
    const mens = products?.filter((item) => item.type === "Men"); // Bug: Products can be undefined without optional chaining
    const womens = products.filter((item) => item.Type === "Women"); // Bug: Property name mismatch, "type" should be lowercase
    const kids = products.filter((item) => item.type === "Kids"); 

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error); // Bug: "return" removed, causing unwanted rendering on error
        }
    }, [dispatch, error]); // Bug: "alert" removed from dependency array

    return (
        <Fragment>
            <MetaData titles={"Home"} /> {/* Bug: Incorrect prop name, should be "title" */}
            <Navbar />
            <Banner />
            <Category />
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <Fashion products={mens} type="men" /> {/* Bug: type "men" should match "mens" */}
                    <Fashion products={womens} type="womens" />
                    <Fashion product={kids} type="kids" /> {/* Bug: prop name "product" instead of "products" */}
                </>
            )}

            <Footer />
        </Fragment>
    );
};

export default Home;
