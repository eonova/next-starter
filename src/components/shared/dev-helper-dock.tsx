'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import {
  PinIcon,
  PinOffIcon,
  SettingsIcon, // 占位符图标
  GripVerticalIcon // 用于窥视区域的拖拽样图标
} from 'lucide-react'
import { Button } from '@/components/ui/button' // 假设来自 shadcn/ui
import { cn } from '@/lib/utils' // 假设来自 shadcn/ui 项目

// 定义窥视区域的宽度 (Tailwind 类和 CSS 值)
const PEEK_AREA_WIDTH_CLASS = "w-10"; // 例如 w-12 (3rem / 48px)
const PEEK_AREA_CSS_VALUE = "2.5rem";

// 定义内容区域的最小宽度
const CONTENT_MIN_WIDTH_CLASS = "min-w-40"; // 例如 min-w-56 (14rem / 224px)

const DEV_TOOLS = [
  {
    name: 'Jotai',
    href: 'https://jotai.jscn.org/docs/introduction'
  }
]

const DevHelperDock: React.FC = () => {
  const [isPinned, setIsPinned] = React.useState(false);
  const [autoHideEnabled] = React.useState(true);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null); // 用于管理悬停延迟

  // 决定 Dock 的目标状态 (打开或窥视)
  const targetState = React.useMemo(() => {
    if (isPinned) return 'open'; // 如果已固定，则始终打开
    if (!autoHideEnabled) return 'open'; // 如果关闭了自动隐藏，则始终打开
    return isMouseOver ? 'open' : 'peeking'; // 否则根据鼠标悬停状态决定
  }, [isPinned, autoHideEnabled, isMouseOver]);

  // Framer Motion 的动画变体
  const dockVariants = {
    open: { x: '0%' },
    peeking: { x: `calc(-100% + ${PEEK_AREA_CSS_VALUE})` }, // 从左侧露出 PEEK_AREA_CSS_VALUE 宽度
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMouseOver(true);
    }, 150); // 悬停150毫秒后展开
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsMouseOver(false);
  };

  return (
    <motion.div
      layout // 启用自动布局动画，处理尺寸变化
      initial="peeking" // 初始状态
      animate={targetState} // 动画到当前目标状态
      variants={dockVariants}
      transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.5 }}
      className={cn(
        'fixed left-0 top-1/2 z-50 flex -translate-y-1/2 transform', // 定位和垂直居中
        'bg-background/50 shadow-xl backdrop-blur-md border-t border-r border-b border-border rounded-r-lg' // 外观样式
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 主要内容区域 */}
      <div className={cn(
        "p-3 pr-2 border-r border-border", // 内边距和右边框
        CONTENT_MIN_WIDTH_CLASS, // 设置最小宽度
        // 内容区的可见性可以通过 targetState 控制，但 x transform 是主要的隐藏方式
        // targetState === 'open' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'
      )}>
        <div className="flex flex-col space-y-2 items-start h-full">
          <h3 className="px-1 font-semibold text-foreground text-sm whitespace-nowrap">
            Tech Stack
          </h3>

          {/* 在这里放置你的开发者工具/链接 */}
          {
            DEV_TOOLS.map((tool) => (
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" key={tool.name} onClick={() => window.open(tool.href, '_blank')}>
                <SettingsIcon className="mr-2 h-3.5 w-3.5" />
                {tool.name}
              </Button>
            ))
          }

          <div className="flex-grow" /> {/* 填充剩余空间，将控制按钮推到底部 */}

          {/* 内容区域底部的控制按钮 */}
          <div className="w-full space-y-1 pt-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
              onClick={() => setIsPinned(!isPinned)}
              title={isPinned ? '取消固定' : '固定面板'}
            >
              {isPinned ? <PinOffIcon className="mr-2 h-3.5 w-3.5" /> : <PinIcon className="mr-2 h-3.5 w-3.5" />}
              {isPinned ? '已固定' : '固定'}
            </Button>
          </div>
        </div>
      </div>

      {/* 窥视/控制区域 (右侧窄条) */}
      <div className={cn(
        "flex flex-col items-center justify-center space-y-3 p-1.5 h-full", // 垂直排列，居中
        PEEK_AREA_WIDTH_CLASS // 应用定义的宽度
      )}>
        <GripVerticalIcon className="h-5 w-5 text-muted-foreground cursor-grab mt-1" />
        <span className='font-mono text-xs rotate-90'>DEV</span>
      </div>
    </motion.div>
  );
};

export default DevHelperDock;
