import { action, DidReceiveSettingsEvent, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

/**
 * An example action class that displays a count that increments by one each time the button is pressed.
 */


@action({ UUID: "com.chenzo.basic-simple-plugin.payload" })
export class PayloadInspector extends SingletonAction<PayLoadInspecSettings> {
	/**
	 * The {@link SingletonAction.onWillAppear} event is useful for setting the visual representation of an action when it become visible. This could be due to the Stream Deck first
	 * starting up, or the user navigating between pages / folders etc.. There is also an inverse of this event in the form of {@link streamDeck.client.onWillDisappear}. In this example,
	 * we're setting the title to the "count" that is incremented in {@link IncrementCounter.onKeyDown}.
	 */
	onWillAppear(ev: WillAppearEvent<PayLoadInspecSettings>): void | Promise<void> {
		let clr = ev.payload.settings.fav_color ?? "white";
		return ev.action.setTitle(`${clr} | ${ev.payload.settings.count ?? 0}`);
	}

	onDidReceiveSettings(ev: DidReceiveSettingsEvent<PayLoadInspecSettings>): Promise<void> | void {
		let clr = ev.payload.settings.fav_color ?? "white";
		return ev.action.setTitle(`${clr} | ${ev.payload.settings.count ?? 0}`);
		//return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`);
	}

	/**
	 * Listens for the {@link SingletonAction.onKeyDown} event which is emitted by Stream Deck when an action is pressed. Stream Deck provides various events for tracking interaction
	 * with devices including key down/up, dial rotations, and device connectivity, etc. When triggered, {@link ev} object contains information about the event including any payloads
	 * and action information where applicable. In this example, our action will display a counter that increments by one each press. We track the current count on the action's persisted
	 * settings using `setSettings` and `getSettings`.
	 */
	async onKeyDown(ev: KeyDownEvent<PayLoadInspecSettings>): Promise<void> {
		// Determine the current count from the settings.
		let count = ev.payload.settings.count ?? 0;
		count++;

		console.log("This should show in DEBUG CONSOLE");
		console.log(ev);

		// Update the current count in the action's settings, and change the title.
		await ev.action.setSettings({
			count: count,
			fav_color: ev.payload.settings.fav_color
		});
		await ev.action.setTitle(`${ev.payload.settings.fav_color} | ${count}`);
	}
}

/**
 * Settings for {@link PayloadInspector}.
 */
type PayLoadInspecSettings = {
	count: number;
	fav_color: string;
};
