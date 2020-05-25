import { MDXProvider } from "@mdx-js/react"

export default function Mdlay({ children }) {
  return (
    <MDXProvider
      components={{
        // Or define component inline
        p: props => <p {...props} style={{ color: "#F00" }} />,
      }}
    >
      {children}
    </MDXProvider>
  )
}