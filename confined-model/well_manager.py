class WellManager (object): # <<<

    def __init__ (self): # <<<
        self.reinit ()
    # >>>

    def reinit (self): # <<<
        self.x2iy = {}
        self.dead = 0
        self.priority = []
    # >>>

    def add (self, x, y): # <<<
        d = self.x2iy
        indices = set (i for i, y in d.itervalues ())
        found_index = False
        for i in range (1, len (indices) + 2):
            if i not in indices:
                found_index = i
                break
        if not found_index: # should not happen!
            raise Exception, "** Could not determine new index?!"
        # if x exists already, it will be silently removed.
        d [x] = found_index, y
        self.mark_as_alive (x)
    # >>>
    def clean_dead (self): # <<<
        n = self.dead
        if n:
            assert n > 0
            p = self.priority
            p_pop = p.pop
            d = self.x2iy
            d_pop = d.pop
            while True:
                if not p:
                    break
                x = p_pop ()
                if d_pop (x, None) is not None:
                    n -= 1
                    if not n:
                        break
            assert n >= 0
            self.dead = n
    # >>>
    def mark_as_alive (self, x): # <<<
        p = self.priority
        if x in p:
            p.remove (x)
        p.insert (0, x)
    # >>>
    def modify (self, x, y): # <<<
        d = self.x2iy
        if x in d:
            i, tmp = d [x]
            d [x] = i, y
            self.mark_as_alive (x)
        else:
            self.add (x, y)
    # >>>
    def remove (self): # <<<
        self.dead += 1
    # >>>
    def stats (self): # <<<
        """
        Returns ``n, [(i, x, y)]`` where ``i`` is the well index
        (1 based) and ``n`` is the number of wells.

        Note that the length of the ``i, x, y`` list can be
        greater than ``n``, if it is ambiguous as to which well
        was removed, given the information gathered so far.
        """
        len_ = len
        self.clean_dead ()
        d = self.x2iy
        n = len_ (d) - self.dead
        ixys = list ((tup [0], x, tup [1]) for x, tup in d.iteritems ())
        assert len_ (ixys) >= n
        return n, ixys
    # >>>

# >>>
