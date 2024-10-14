import {
	registerFormatType,
	applyFormat,
	removeFormat,
} from "@wordpress/rich-text";
import { __ } from "@wordpress/i18n";
import { RichTextToolbarButton, ColorPalette } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { Popover, PanelBody } from "@wordpress/components";
import lowHighlightIcon from "./assets/low-highlight.svg";
import lowHighlightActive from "./assets/low-highlight-active.svg";
import "./style.scss";

registerFormatType("curvy/low-highlight", {
	title: __("Low highlight", "curvy"),
	tagName: "span",
	className: "curvy-low-highlight",
	edit: ({ onChange, value, contentRef, isActive }) => {
		const [showColors, setShowColors] = useState(false);
		const lowHighlight = value.activeFormats?.find(
			(format) => format.type === "curvy/low-highlight"
		);
		const attributes = {
			...(lowHighlight?.attributes || {}),
			...(lowHighlight?.unregisteredAttributes || {}),
		};
		return (
			<>
				<RichTextToolbarButton
					icon={
						<img
							height={24}
							width={24}
							src={isActive ? lowHighlightActive : lowHighlightIcon}
						/>
					}
					title={__("Low highlight", "curvy")}
					onClick={() => {
						setShowColors(true);
					onChange(
						applyFormat(value, {
							type: "curvy/low-highlight",
						})
					)
					}}
				/>
				{!!showColors && (
					<Popover
						anchor={contentRef?.current}
						onClose={() => {
							setShowColors(false);
						}}
					>
						<PanelBody>
							<ColorPalette
								value={attributes?.["data-color"]}
								onChange={(newValue) => {
									if (newValue) {
										onChange(
											applyFormat(value, {
												type: "curvy/low-highlight",
												attributes: {
													"data-color": newValue,
													style: `background-image: linear-gradient(to right, ${newValue}, ${newValue})`,
												},
											})
										);
									} else {
										onChange(
											removeFormat(value, "curvy/low-highlight")
										);
									}
								}}
							/>
						</PanelBody>
					</Popover>
				)}
			</>
		);
	},
});
