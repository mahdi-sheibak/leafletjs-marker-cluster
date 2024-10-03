"use client";
import type { ReactNode } from "react";
import {
  extendContext,
  createElementObject,
  createPathComponent,
  type LeafletContextInterface,
} from "@react-leaflet/core";
import L, {
  LeafletEventHandlerFn,
  type LeafletMouseEventHandlerFn,
} from "leaflet";
import "leaflet.markercluster";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

type ClusterType = { [key in string]: LeafletEventHandlerFn };

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn;
  onDblClick?: LeafletMouseEventHandlerFn;
  onMouseDown?: LeafletMouseEventHandlerFn;
  onMouseUp?: LeafletMouseEventHandlerFn;
  onMouseOver?: LeafletMouseEventHandlerFn;
  onMouseOut?: LeafletMouseEventHandlerFn;
  onContextMenu?: LeafletMouseEventHandlerFn;
};

type MarkerClusterControl = L.MarkerClusterGroupOptions & {
  children: ReactNode;
} & ClusterEvents;

function getPropsAndEvents(props: MarkerClusterControl) {
  let clusterProps: ClusterType = {};
  let clusterEvents: ClusterType = {};

  Object.entries(props).forEach(([propName, prop]) => {
    if (propName.startsWith("on")) {
      clusterEvents = { ...clusterEvents, [propName]: prop };
    } else {
      clusterProps = { ...clusterProps, [propName]: prop };
    }
  });
  return { clusterProps, clusterEvents };
}

function createMarkerClusterGroup(
  props: MarkerClusterControl,
  context: LeafletContextInterface
) {
  const { clusterProps, clusterEvents } = getPropsAndEvents(props);
  const markerClusterGroup = new L.MarkerClusterGroup(clusterProps);
  Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
    const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
    markerClusterGroup.on(clusterEvent, callback);
  });

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup })
  );
}

export const MarkerClusterGroup = createPathComponent<
  L.MarkerClusterGroup,
  MarkerClusterControl
>(createMarkerClusterGroup);
