import React from 'react';
import { LuHeart } from 'react-icons/lu';

const TopPostCard = ({title, coverImageUrl, views, likes, maxViews}) => {
    const viewPercentage = ((views / maxViews) * 100).toFixed(0);
  return (
    <div>TopPostCard</div>
  )
}

export default TopPostCard