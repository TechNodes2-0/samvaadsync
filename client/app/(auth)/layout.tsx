const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center mt-[5rem]">{children}</div>
  );
};

export default Layout;
