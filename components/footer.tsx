import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import getCategories from "@/actions/category/get-categories";

const Footer = async () => {
  const categories = await getCategories();

  return (
    <footer className="bg-primary-foreground py-12 md:py-16 lg:py-20 mt-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-16 lg:mb-20">
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h3>
            <nav className="grid gap-2">
              {categories?.map((category) => (
                <Link
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  href={`/category/${category.slug}`}
                  key={category.id}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              About
            </h3>
            <nav className="grid gap-2">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="About Link"
              >
                Our Story
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="About Link"
              >
                Careers
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="About Link"
              >
                Sustainability
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Contact
            </h3>
            <nav className="grid gap-2">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="/contact"
                aria-label="Contact Link"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="Social Link"
              >
                <FiFacebook className="w-6 h-6" />
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="Social Link"
              >
                <FaXTwitter className="w-6 h-6" />
              </Link>
              <Link
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                href="#"
                aria-label="Social Link"
              >
                <IoLogoInstagram className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} InfinitySneakers. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
