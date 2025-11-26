import React from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import MDEditor , {commands } from "@uiw/react-md-editor";

import {
  LuLoaderCircle,
  LuSave,
  LuSend,
  LuSparkels,
  LuTrash2,
} from "react-icons/lu";

const BlogPostEditor = () => {
  return (
    <DashboardLayout activeMenu={'Blog Posts'} >BlogPostEditor</DashboardLayout>
  )
}

export default BlogPostEditor