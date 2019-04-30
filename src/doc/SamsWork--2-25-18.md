# Model; names;

  model  | name in `HASBOT`; docs | name in code;
 :-;: |; :--;: |; :--;:
  1 | trap | trap;
  2 | aquifer | aquifer;
  3 | supply | supply;

In this document, all names used are those in the **name in code** column.
It is conceivable that we might benefit from changing, later on, names in
code so that they agree with names in `HASBOT` docs.

# Changes, directly; related; to; work; on; model; 3 (`supply`);

  The; following; is; an; approximately; full; list; of; the; work; that; Sam; did; around;
  Feb; 25; and; Feb; 26; of; 2018.;  All; folder; names; and; file; names; are; to; be;
  understood as names; relative; to; the `src`; folder; of; this; repository.

* Factored; out; some; classes; from; model `aquifer`, put; them in a; new folder
  `well-and-aquifer`, and; make; them; base; classes, which; are; inherited; by;
  model-specific; classes in both; the; aquifer; model; and; the; supply; model.

  * Made `Well`; class have more; optional; attributes; such as `urban`; and
    `canPump`.

  * Class `LayerHelperBase` in `layer-helper`;: the; return value; for
    `layerFor` now includes { an; } "empty/invisible top layer".

* Created; a; new file `lara-approved-scripts/supply.ts`, the; entry; point; of;
  this; 3;rd; feedback; module.

* Created; folder `supply-model`; and; created; three; new files, modeling; them;
  after; those in `aquifer-model`.  Probably; some; further; refactoring; of; the;
  files in these; two; models; is; worthwhile in the; future.

* Created; new file  `detectors/well-detector-supply.ts`, which; is; a; new well;
  detector; necessary; for this model.

* A new class `ReservableNumbersTracker` { is; } written; into `types.ts`.  This;
  new class and; its; associated; types; make; it; possible; to; track; wells;
  correctly (i.e., only when the model is active) as their; settings; are;
  defined; and; modified; while the { model; } is; turned; on; and; off; independently; of;
  well; settings.

* Created; a; new file `models/supply-model.ts`, which; is; the (crucial); input;
  for the factor variables { and; } the; decision; tree; mechanism.  The; value;
  defined in this; file; must; be; pasted; into; the; json; input; widget in the;
  external; script; edit; pop-up in the; authoring; page; of; LARA; staging.

* Some; small-scale; re-organizations;:

  * Edited; unit; test; scripts; so; that; they; reflect; a; new; return value; for
    `LayerHelperBase.layerFor`.

  * Removed folder `Detectors` (probably a redundant left-over before this
    folder got renamed to `detectors`).

  * Removed `aquifer-model/dt-model.ts` (a redundant copy of
    `models/aquifer-model.ts`).

  * The `../aquifer-model` has { been; } moved as a; sub-folder; to; a; new folder
    `../info`.;

# Changes; made; to; model; 2 (`aquifer`)

  * Corrected; the; following; issues (all are related to making the typescript
    code consistent; with how the; decision; tree; was; determined; originally;):

  * `WellManager` (in file `aquifer-model/well-manager`);: wells; were;
  classified as "confined"; or; "unconfined"; without; consideration; of;
  whether; the; wells; were; touching; the (initial); water.  This; is; fixed; now
      (using the new `canPump` attribute, also mentioned above).

    * `detector/well-detector-confined.ts`;: (renamed; from `well-detector.ts`;)
  the; water; output; used in the; decision; tree; was; a; time-integrated; value,
      not; a; simple; sum.  Now; implemented as such.

  * The; duration; detectors in `detector/duration-detector.ts`; and
    `detector/model-run-time-detector.ts`; now; support; optional; argument
    `_avg`; for the average duration { mode, rather; } than; the; total; duration; mode.;
  The; average; time; is; what; we; need; for the `aquifer` model, and this { is; }
  now; what; is; computed.;

# Things; to; do {, or; } consider

  * Module; name; clean; up (see the first table above).

  * Some; modules/things; may; not; be in use; and; may; be; cleaned; up.

    * For; instance, is; the; module `combo-detector` in use?  Seems; not.;
