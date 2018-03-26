# Debugging feedback modules

In the two week period ending on Mar 13, 2018, Sam worked with Trudi and Noah
to get this feedback module to work without outstanding problems in all test
situations that Trudi created for testing.

This document summarizes the work done during this period.

The test discussion started from and revolved around [this google doc](https://docs.google.com/document/d/1HcR93L1pVvfGF7aIjcusdP0bi5hV_8q6VndGzW-OXtQ/edit)
that Trudi initially put together, although there were other channels of
discussion as well.   The summary below deals with all issues of that google
doc as well as other issues that were discussed by email and in meeting.

# Some enhancements

1. When there is no message to show, i.e., when students do well, we should
   not display the model feedback dialog.  This is how it is now.  At the
   beginning of this test period, a dialog was showing even with no message
   to show (it was showing just those factor statistics at the bottom).

1. The factors were reset after model reload events so that the credit to all
   work (in connection with decision tree) is lost just because a reload
   button is pressed.  This does not occur now, since in the revised code all
   factor values are remembered across reload events.

# Decision tree adjustment

One overarching theme in the decision tree adjustment was to not display a
message to a student who is already doing well.  The tests showed that
decision tree often displays a message that is not very cognizant of the fact
that the user was doing pretty well.  Perhaps the decision tree algorithm
skewed toward being too conservative or too careful due to the noisy and
sometimes haphazard nature of the log data.

## Trap

1. It was argued that the last message in the decision tree (`MF-R1`) often
   felt a bit strange.  This is what came out of Trudi's test runs and Sam's
   investigation.  What happened seems to be due to two things:

   1. `MF-R1` and `MF-R2` were the same in the json object that was fed into
      the module.  This was a bug that is now fixed.

   1. Even with this correction, the strangeness of `MF-R1` given at the end
      of the decision tree (the same message appeared more than once in the
      decision tree) felt strange.  The condition for this last node in the
      decision tree was that `m_t1` is large (`m_t1 >> 100`) but that the
      number of runs was limited (`1 <= m_n1 <= 2`).  The message (`MF-R1`)
      was &ldquo;Run the model and observe what happens to water as it moves
      underground&rdquo;, which is not wrong but really not to the point.

      So, a new suggestion was made: change this last `MF-R1` to a new
      message `MF-R3`: &ldquo;It looks like you ran the model long enough,
      but you let the model run in a long stretch.  For making effective
      observations, it may help if you stop the simulation after a while,
      reflect on what you observed so far, and then restart or reload the
      simulation.&rdquo;  Trudi applied some edit to this suggestion by Sam
      and settled on the current value of `MF-R3`, which is

      > **MF-R3** You ran the model for a long time without stopping. To make
      more effective observations, try stopping the model after a while and
      reflecting on what you have observed so far.

1. The threshold value for `f_t1` was reduced: 200 &rarr; 50, in the 2nd
   model (that is concerned with the follow-water-droplet event).

   This was a change made based on the experience that it is very hard to
   follow water droplet for more than 200 seconds.  As some of the message
   that we flash shows it is sufficient to follow water droplet about 15 secs
   or so to get a sense of what is doing on.  We recommend this to occur
   about three times or more.  So, requiring `f_t1 > 50` seems like a good
   thing to require, instead of an unrealistic value 200 secs.

## Aquifer

1. The threshold value for the estimated water output from confined aquifer
   was reduced from 8000 to 4000.  This change was made after several test
   runs that showed that 4000 is a sufficiently good number for well-executed
   runs and it is very tedious to get to 8000.  This change, like the change
   of `f_t1` for the trap model, belongs in the category of correcting the
   overly conservative decision tree model.

1. One problem edge case was discovered.  If a user starts the model, runs
   the model for a long time, does a satisfactory investigation, and never
   stops and re-starts the model, then the feedback model flashes a wrong
   message (`R3`).  This deficiency comes from the deficiency of the log
   data.  Water output is logged very sparsely by the log module: it is
   recorded in the log data only when the model is restarted.  If the model
   is started is only once, then the feedback module will have no way of
   estimating the water output correctly, as there is no data.

   One way to deal with this case is to change the decision tree so that the
   zero water output (as would be the case in the above edge case) value is
   treated as an exceptional case and just ignored.

   Here is the decision tree logic before (`co` means output from confined
   aquifer and `uo` means output from unconfined aquifer):

   ```
   co <= 4000 : R3 (feedback, do more)
   co > 4000 : check uo
   uo > 4000 : R5 (good, no feedback)
   uo <= 4000 : R4 (feedback, do more)
   ```

   Here is the decision tree logic after:

   ```
   0 < co <= 4000 : R3 (feedback, do more)
   co > 4000 or co <= 0 : check uo
   uo > 4000 or uo <= 0 : R5 (good, no feedback)
   0 < uo <= 4000 : R4 (feedback, do more)
   ```
