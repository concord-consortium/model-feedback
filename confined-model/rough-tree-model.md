
## He-Sun's confinfined aquifer feedback model (text)


### Factors:

- `mt   = model_run_time` ⬅ Simple detector (reuse)
- `rp_a = rain_propbability_average` ⬅ Simple detector
- `rp_r = rain_probability_range`  ⬅ Simple detector
- `co   = confined_aquifer_output` ⬅ Complex Well Detector
- `uo   = unconfined_aquifer_output` ⬅ Complex Well Detector



### Decision Tree:
model_average run time should be greater than 70 seconds → if not provide feedback
yes

rain probability average should be greater than 40% (or .40) → if not, provide feedback on to experiment with higher rain probability scenario
yes
rain probability range should be greater than 30% (or .30) → If not, students’ exploration range has been too narrow, provide feedback.

yes
confined aquifer output should be greater than 8000 → If not, students did not experience confined aquifer being depleted. Provide feedback on this.

yes
unconfined aquifer output should be greater than 4000 → If not, students did not experience how unconfined aquifer works. Provide feedback on this and ask to compare between the two types of aquifers.


