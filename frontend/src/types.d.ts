import type { Task } from "./api/types";
import { DndEventInfo } from "svelte-dnd-action";

export interface ListDndEvent extends Event {
	detail: {
		items: Task[],
		info: DndEventInfo;
	};
}