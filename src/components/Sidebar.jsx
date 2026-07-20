import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ classes, currentClassId }) => {
    const navigate = useNavigate();

    // Manual drag-to-scroll state
    const listRef = useRef(null);
    const [isDraggingList, setIsDraggingList] = useState(false);
    const dragStartYRef = useRef(0);
    const dragStartScrollTopRef = useRef(0);
    const hasDraggedRef = useRef(false);

    const handlePointerDown = (e) => {
        if (!listRef.current) return;
        hasDraggedRef.current = false;
        setIsDraggingList(true);
        dragStartYRef.current = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
        dragStartScrollTopRef.current = listRef.current.scrollTop;
    };

    const handlePointerMove = (e) => {
        if (!isDraggingList || !listRef.current) return;
        const currentY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
        const deltaY = dragStartYRef.current - currentY;
        if (Math.abs(deltaY) > 5) {
            hasDraggedRef.current = true;
        }
        listRef.current.scrollTop = dragStartScrollTopRef.current + deltaY;
    };

    const handlePointerUp = () => {
        setIsDraggingList(false);
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col pt-6 px-4 h-full z-30 select-none overflow-hidden">
            {/* Fixed Brand Header */}
            <div className="shrink-0">
                <div className="px-3 mb-6 flex items-center gap-3">
                    <img src="/bstbpc_logo.png" alt="BSTBPC Logo" className="h-10 w-auto object-contain" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-blue-700 leading-none tracking-tighter">BSTBPC</span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Textbooks</span>
                    </div>
                </div>

                <div className="px-3 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Classes</span>
                </div>
            </div>

            {/* Scrollable Classes List */}
            <div
                ref={listRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                onPointerCancel={handlePointerUp}
                data-lenis-prevent="true"
                className="flex-1 overflow-y-auto scrollbar-hide pr-1 pb-6 space-y-1 cursor-grab active:cursor-grabbing"
            >
                {classes.length > 0 ? (
                    classes.map((cls) => {
                        const isActive = Number(currentClassId) === cls.id;

                        return (
                            <div key={cls.id}>
                                <div
                                    onClick={() => {
                                        if (hasDraggedRef.current) {
                                            hasDraggedRef.current = false;
                                            return;
                                        }
                                        if (!isActive) navigate(`/books/${cls.id}`);
                                    }}
                                    className={`
                                        group flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                                        ${isActive
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-all
                                            ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"}
                                            `}
                                        >
                                            {cls.id}
                                        </div>
                                        <span className="text-sm font-bold tracking-tight">{cls.name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-12 text-center text-slate-400">
                        <p className="text-sm font-bold">No results found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
